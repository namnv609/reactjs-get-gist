/** @jsx React.DOM */

var wrapper = document.getElementById('wrapper');

var Form = React.createClass({
    handleFormSubmit: function(event) {
        event.preventDefault();

        var gitUser = this.refs.gitUser.getDOMNode().value.trim();

        if (gitUser !== "" && gitUser) {
            $.ajax({
                type: 'GET',
                url: 'https://api.github.com/users/'+ gitUser +'/gists',
                dataType: 'json',
                success: function(response) {
                    this.setState({
                        gists: response
                    });
                }.bind(this),
                error: function(xhr, ao, err) {
                    alert(err);
                }.bind(this)
            });
        } else {
            alert("Github user is required field");
            this.refs.gitUser.getDOMNode().focus();
        }
    },
    getInitialState: function() {
        return {
            gists: []
        }
    },
    render: function() {
        return (
            <div>
                <div className="frm">
                    <form name="frmGitUser" autocomplete="off" onSubmit={this.handleFormSubmit}>
                        <label for="gitUser">Github user:</label><br />
                        <input type="text" ref="gitUser" id="gitUser" placeholder="ie: facebook" /><br />
                        <span></span>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="gists">
                    <Gist gists={this.state.gists}></Gist>
                </div>
            </div>
        );
    }
});

var Gist = React.createClass({
    render: function() {
        gists = this.props.gists;

        if (gists) {
            var gist = this.props.gists.map(function(value, idx) {
                return (
                    <div className="gist">
                        <p>URL: <a href={value.url} target="_blank">{value.url}</a></p>
                        <p>Fork: <a href={value.forks_url} target="_blank">{value.forks_url}</a></p>
                        <p>ID: {value.id}</p>
                    </div>
                );
            });

            return (
                <div>
                    {gist}
                </div>
            );
        } else {
            return (
                <div>No git</div>
            )
        }
    }
});

React.renderComponent(<Form/>, wrapper);