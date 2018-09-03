import React, { Component } from 'react';
import { Query } from 'react-apollo';

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Query
      query={this.props.query}
      fetchPolicy={'cache-first'}
    >
      {({ loading, data }) => {
        if (loading) {
          return <div>Loading items...</div>;
        }
        else {
          const items = data[this.props.collection];
          const Details = this.props.details;
          const accordion = <div className="accordion">
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <button onClick={
                      (e) => {
                        const panel = e.target.nextElementSibling;
                        if (panel.style.maxHeight){
                          panel.style.maxHeight = null;
                        } else {
                          panel.style.maxHeight = panel.scrollHeight + "px";
                        } 
                      }
                    }
                    >{item.name}</button>
                    <Details item={item}/>
                  </div>
                )
              }
              )}
            </div>;
          const staticView = <div className="static">
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <Details item={item}/>
                  </div>
                )
              }
              )}
            </div>;
          return this.props.accordion ? accordion : staticView;
        }
      }}
    </Query>
  }
}

export default List;
