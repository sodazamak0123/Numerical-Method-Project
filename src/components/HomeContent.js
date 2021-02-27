import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

class HomeContent extends React.Component{

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1>Home</h1>
            </div>
        );
    }

}

export default  HomeContent;