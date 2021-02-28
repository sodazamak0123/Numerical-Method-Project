import React from 'react';
import { Layout } from 'antd';
import './Content.css';

const { Content } = Layout;

class GaussEliminationMethod extends React.Component{

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Gauss Elimination Method</h1>
            </div>
        );
    }

}

export default  GaussEliminationMethod;