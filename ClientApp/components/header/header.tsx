import * as React from "react";
import "./header.scss";
import { connect } from 'react-redux';
import { provide } from "redux-typed";
import bootstrap from '../../services/bootstrapServices';
import { auth0Service } from '../../services/bootstrapServices';

class HeaderClass extends React.Component<HeaderProps, any> {
    constructor() {
        super();
    }

    login() {
        auth0Service.login();
    }
    logout() {
        auth0Service.logout();
    }
    render() {
        return (
            <header className="global-header">
                <div className="global-header__title">
                    WITF
                </div>
                {auth0Service.loggedIn() &&
                    <div className="global-header-user">
                        <span>{this.props.userProfile.name}</span>
                        <img src={this.props.userProfile.picture} alt={this.props.userProfile.name} />
                        <span className="login" onClick={this.logout.bind(this)}>Logg ut</span>                            
                    </div>
                }
                {!auth0Service.loggedIn() &&
                    <div className="global-header-user">
                        <span className="login" onClick={this.login.bind(this)}>Logg inn</span>                            
                    </div>
                }
            </header>
        );
    }
}

const provider = provide((state: IApplicationState) => {
        return {
            userProfile: state.userProfile
        }
    }, {}
);

type HeaderProps = typeof provider.allProps;

export const Header = provider.connect(HeaderClass as any);