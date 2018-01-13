import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    var styles={
        NotFoundWrapper: {
          display: 'table',
          height: '83vh',
          width: '100%',
        },
        NotFoundContent: {
          display: 'table-cell',
          width: '100%',
          textAlign: 'center',
          verticalAlign: 'middle',
          fontSize: '2.5em',
        }
      }
    return (
        <div>
            <Helmet>
                <title>Dirtyredz - Not Found</title>
            </Helmet>
            <div style={Object.assign({}, styles.NotFoundWrapper)}>
              <div  style={Object.assign({}, styles.NotFoundContent)}>
                <h1>404</h1>
                <h2>Page not found!</h2>
                <p>
                  <Link to="/">Go back to the main page</Link>
                </p>
              </div>
            </div>
        </div>

    );
  }
}
