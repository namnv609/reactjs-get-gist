/** @jsx React.DOM */

var myDiv = document.getElementById('myDiv');
var myForm = document.getElementById('myForm');

var MyForm = React.createClass({
	handleFormSubmit: function(e) {
		e.preventDefault();

		var gitUser = this.refs.gitUser.getDOMNode().value.trim();
		
		if (gitUser != "" && gitUser) {
			$.ajax({
				type: 'GET',
				url: 'https://api.github.com/users/'+ gitUser +'/gists',
				success: function(response) {
					this.setState({
						gists: response
					});
				}.bind(this),
				error: function(xhr, ao, err) {
					alert(err);
				}.bind(this)
			});
		}
	},
	render: function() {
		return (
			<form name="frmGitUser" onSubmit={this.handleFormSubmit}>
				<input type="text" ref="gitUser" placeholder="Enter Github user" /><br />
				<button type="submit">Get</button>
			</form>
		);
	}
});

var GitFile = React.createClass({
	render: function() {
		var file = Object.keys(this.props.files).map(function(file) {
			return (
				<li>{file}</li>
			);
		});

		return (
			<ul>{file}</ul>
		)
	}
});

var Gist = React.createClass({
	render: function() {
		var gistNode = this.props.gist.map(function(gist, index) {
			console.log(gist.files);
			return (
				<div className="fw">
					<p>Url: {gist.url}</p>
					<p>Fork: {gist.forks_url}</p>
					<p>Id: {gist.id}</p>
					Files: <GitFile files={gist.files}></GitFile>
					<hr />
				</div>
			)
		});
		return (
			<div>
				{gistNode}
			</div>
		);
	}
});

var Gists = React.createClass({
	loadGistsFromGithub: function() {
		$.ajax({
			type: 'GET',
			url: this.props.url,
			success: function(response) {
				this.setState({
					gists: response
				});
			}.bind(this),
			error: function(xhr, ao, err) {
				alert(err);
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			gists: []
		}
	},
	componentDidMount: function() {
		this.loadGistsFromGithub();
	},
	render: function() {
		return (
			<Gist gist={this.state.gists}></Gist>
		);
	}
});

// React.renderComponent(<Gists url="https://api.github.com/users/chuanhtuan/gists"/>, myDiv);
React.renderComponent(<MyForm/>, myForm);