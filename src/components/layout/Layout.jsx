import { Outlet } from "react-router-dom";
import GNB from "./GNB"

function Layout () {
    return(
        <div>
            <GNB/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;