import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { List, Avatar, Icon } from 'antd';


class SearchResult extends Component {
    render() {
        const listData = this.props.results;  
        console.log(this.props.results);
         
//     for(let i = 0; i < 5; i++) {
//     listData.push({
//         href: 'http://ant.design',
//         title: `ant design part ${i}`,
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//         content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     });
// }

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    );
        return (
            <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                    <List.Item  //THIS IS STILL DUMMY DATA
                        key={item.title}
                        actions={[<IconText type="star-o" text={item.likes} />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<Link to={`/existing-story/${item.story}`}>{<img width={272} alt="logo" src={item.header_photo} />}</Link>}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.profile_pic} />}
                            title={<Link to={`/existing-story/${item.story}`}>{item.title}</Link>}
                            description={item.description}
                        />
                        {item.intro} <Link to={`/existing-story/${item.story}`}>Read</Link>
                    </List.Item>
                )}
            />
            </div>
        )
    }
};
// const mapStateToProps = (rs) => ({ //not needed atm
//     searchResults: rs.searchResults,
// });

export default connect()(SearchResult);