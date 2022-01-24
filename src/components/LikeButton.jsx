import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import axios from 'axios';
class LikeButton extends React.Component{
    state = {
        isChecked: false,
        notice: ' ',
    };
// {this.props.userId}
// {this.props.postId}
    onClick = () => {
        this.state.isChecked ?
        this.setState({
            isChecked: false,
            notice: '',
        })
        :
        this.setState({
            isChecked: true,
            notice: '',
        });

        this.props.onSubmit(this.state.isChecked); //부모컴포넌트(ShowPost.jsx)로 상태 전달 
    }
    render(){
        return(
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked ?  
                    <HeartFilled style={{marginRight: '10px', marginTop: '7px', color:'red'}} className="button fill" onClick={this.onClick}/> :
                    <HeartOutlined style={{marginRight: '10px', marginTop: '7px'}} className="button" onClick={(this.onClick)}/>}
                    {/* <h3>{this.state.notice}</h3> */}
                </div>
            </React.Fragment> 
        )
    }
}

export default LikeButton;
