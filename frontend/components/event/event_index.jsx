import React from 'react';
import EventIndexItem from './event_index_item';
import SplashSearchContainer from './splash_search_container';
import CategoryEventIndex from './categories/category_event_index';

class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      bounds: null
    };

    this.update = this.update.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchEvents(this.state);
    this.props.fetchCategories();
  }

  update(filter, value) {
    this.setState({[filter]: value }, () => {this.props.updateFilters(this.state)});
  }

  render () {
    const { events } = this.props;
    return (
      <div className="event-index">
        <header className="background">
          <div className="background-img-container">
            <img className="background-img" src={window.images.splash} />
          </div>
          <div className="lower-background"></div>
        </header>

        <div className='browse-events-header'>
          <img className='event-index-img' src={window.images.splash}></img>
          <div className="splash-words">
            <div className="splash-verbiage-open">Let's</div>
            <div className="splash-verbiage-close">TACO bout it</div>
          </div>

        <SplashSearchContainer />

        </div>
        {this.props.categories ? <CategoryEventIndex categories={Object.values(this.props.categories)} changeCategory={this.props.changeCategory} update={this.update} changeSearch={this.props.changeSearch}/> : null }
        { events ?
          (<ul className='index-events-list'>
            {Object.values(events).map(event => (
              <EventIndexItem key={event.id} event={event} />
            ))}
          </ul>) : (
            <p>event index</p>
          )
          
        }
      </div>
    )
  }
}

export default EventIndex;
