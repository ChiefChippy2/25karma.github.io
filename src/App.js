import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Footer } from 'components';
import { FrontPage, NotFoundPage, PlayerPage } from 'pages';

function App() {
	const pinnedPlayer = Cookies.get('pinnedPlayer');

	return (
		<div className="h-100 v-flex">
			<div className="flex-1">
				<Switch>
					<Route exact path="/">
						{ pinnedPlayer ? 
							<Redirect to={`/player/${pinnedPlayer}`} /> : 
							<Redirect to={`/frontpage`} /> 
						}
					</Route>
					<Route path="/frontpage" component={FrontPage} />
					<Route path="/player/:player" component={PlayerPage} />
					<Route default component={NotFoundPage}/>
				</Switch>
			</div>
			<Footer />
		</div>
		);
}

export default App;
