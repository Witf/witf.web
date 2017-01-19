import * as React from "react";
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
            <header>
                {auth0Service.loggedIn() &&
                    <div className="text-shadow right" style={{ color: "white" }}>
                        <a href="#" onClick={this.logout.bind(this)}>Logg ut</a>
                    </div>
                }
                {!auth0Service.loggedIn() &&
                    <div className="text-shadow right" style={{ color: "white" }}>
                        <a href="#" onClick={this.login.bind(this)}>Logg inn</a>
                    </div>
                }
            </header>
        );
    }
}

const provider = provide((state: IApplicationState) => {
        return {
            details: state.user
        }
    }, {}
);

type HeaderProps = typeof provider.allProps;

export const Header = provider.connect(HeaderClass as any);