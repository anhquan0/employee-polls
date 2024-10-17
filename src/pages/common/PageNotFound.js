import {connect} from "react-redux";
import { Link } from "react-router-dom";
import '../../css/pageNotFound.css';

const PageNotFound = ()  => {
    return (
        <section className="section-container dark:bg-gray-900">
            <div className="page-container lg:py-16 lg:px-6">
                <div className="text-center">
                    <h1 className="error-code lg">404</h1>
                    <p className="error-message md dark">Something's missing.</p>
                    <p className="description dark">
                        Sorry, we can't find that page. You'll find lots to explore on the home page.
                    </p>
                    <Link to="/">
                        <label className="back-button dark:focus">Back to Homepage</label>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});
export default connect(mapStateToProps)(PageNotFound);