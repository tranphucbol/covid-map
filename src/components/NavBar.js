import React from "react";
import { Link, withRouter } from "react-router-dom";

const Menu = (props) => {
    const pathname = props.location.pathname;
    const classNameBase = "font-mono font-bold text-center block border rounded py-2 px-4 transition duration-300 hover:no-underline"
    const classNameNor = "border-white hover:border-gray-200 text-blue-500 bg-gray-200 hover:bg-gray-300"
    const classNameAct = "border-blue-500 bg-blue-500 hover:bg-blue-700 text-white"
    const classNameStats = pathname === "/stats" ? `${classNameBase} ${classNameAct}` : `${classNameBase} ${classNameNor}`;
    const classNameMap = ["/map", "/"].includes(pathname) ? `${classNameBase} ${classNameAct}` : `${classNameBase} ${classNameNor}`;
    return (
        <div className="mb-3">
            <h2 className="font-mono text-center text-3xl my-3 text-gray-700">
                COVID MAP
            </h2>
            <ul className="flex">
                <li className="flex-1 mr-2">
                    <Link className={classNameMap} to="/map">VietNam Map</Link>
                </li>
                <li className="flex-1">
                    <Link className={classNameStats} to="/stats">Infected COVID Chart</Link>
                </li>
            </ul>
        </div>
        
    );
};

export default withRouter(Menu);
