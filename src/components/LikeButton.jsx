import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        const { postId } = this.props;
        const getLike = () => {
            axios.get('http://localhost:7000/wish/id', {
                params: {
                    id: postId
                }
            })
                .then((res) => {
                    this.setState({
                        isChecked: res.data,
                        notice: ' ',
                    });
                })
                .catch((err) => {
                    this.setState({
                        isChecked: false,
                        notice: ' ',
                    });
                })
        };
        this.state = {
            isChecked: getLike(),
            notice: '',
        };
    }

    onClick = () => {
        console.log(this);

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
        this.props.onSubmit(this.state.isChecked);
    }

    render() {
        return (
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked ?
                        <HeartFilled style={{ marginRight: '10px', marginTop: '7px', color: 'red' }} className="button fill" onClick={this.onClick} /> :
                        <HeartOutlined style={{ marginRight: '10px', marginTop: '7px' }} className="button" onClick={(this.onClick)} />}
                </div>
            </React.Fragment>
        )
    }
}

export default LikeButton;
