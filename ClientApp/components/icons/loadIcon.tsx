import * as React from "react";
import "./loadIcon.scss";

export function LoadIcon(props) {
    return (
        <div {...props} className="loadIcon">
            <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
        </div>
    );
}