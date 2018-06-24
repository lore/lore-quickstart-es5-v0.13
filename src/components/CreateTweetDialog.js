import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
  displayName: 'CreateTweetDialog',

  propTypes: {
    onCancel: PropTypes.func
  },

  getInitialState() {
    return {
      data: {
        text: ''
      }
    };
  },

  request(data) {
    lore.actions.tweet.create(data);
  },

  onSubmit() {
    const { data } = this.state;
    this.request(data);
    this.dismiss();
  },

  dismiss() {
    this.props.onCancel();
  },

  onChange(name, value) {
    const nextData = _.merge({}, this.state.data);
    nextData[name] = value;
    this.setState({
      data: nextData
    });
  },

  render() {
    const { data } = this.state;

    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={this.dismiss}>
              <span>&times;</span>
            </button>
            <h4 className="modal-title">
              Create Tweet
            </h4>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={data.text}
                    placeholder="What's happening?"
                    onChange={(event) => {
                      this.onChange('text', event.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.dismiss}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!data.text}
                  onClick={this.onSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
