import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class TopicsList extends React.Component {
  render() {
    var listTopics = this.props.data.map( (obj, idx) => {
        return <li key={idx} className="list-unstyled"><Link className="list-group-item list-group-item-action" to="topic" params={{id: obj._id}}>{obj.topic_name} </Link></li>
    });

    return(
      <div>
        <ul className="list-group">
          {listTopics}
        </ul>
      </div>
    );
  }
}
