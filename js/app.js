/** @jsx React.DOM */
var myDiv = document.getElementById('myDiv');

var HelloWorld = React.createClass({
	render: function() {
		console.log('---------Want to get Gists from attribue------------');
		console.log(this.props.items);
		console.log('---------End get Gists from attr');
		var gistNode = Object.keys(this.props.items).map(function(value) {
			return (
				<p>
					{value.owner.login}<br />
					{value.html_url}
				</p>
			)
		});
		return (
			<div>
				{gistNode}
			</div>
		)
	}
});

var UserGist = React.createClass({
	getInitialState: function() {
		return {
			gist: {}
		}
	},

	componentDidMount: function() {
		$.get(this.props.url, function(res) {
			var firstGist = res[0];
			console.log('AJAX GET from Gist');
			console.log(res);
			console.log('---------End AJAX GET from Gist------------');

			if (this.isMounted()) {
				this.setState({
					// username: firstGist.owner.login,
					// lastGistUrl: firstGist.html_url
					gist: res
				})
			}
		}.bind(this));
	},
	render: function() {
		console.log('---------------Assign Gists to attr-----------------');
		return (
			<HelloWorld items={this.state.gist}/>
		);
	}
});

React.renderComponent(<UserGist url="https://api.github.com/users/octocat/gists"/>, myDiv);