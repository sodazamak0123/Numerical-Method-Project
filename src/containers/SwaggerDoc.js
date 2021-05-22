import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { config } from './SwaggerConfig'

class SwaggerDoc extends React.Component{

    componentDidMount() {
        this.props.setKeys(['19'])
    }

    render(){
        return(
            <div className="site-layout-background">
                <SwaggerUI spec={config} />
            </div>
        )
    }
}

export default SwaggerDoc