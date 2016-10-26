let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.events.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.events.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },

    dayClick( date ) {
      Events.insert( { title: 'Event Title', start: '2016-10-04', end: '2016-10-04', editable: true, type: 'Corporate', guests: 50 } );
      FlowRouter.go('Add_Session');
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
    },

    eventClick( event ) {
      alert('YOU EVENT CLICKER!');
      // Session.set( 'eventModal', { type: 'edit', event: event._id } );
      // $( '#add-edit-event-modal' ).modal( 'show' );
    },

  });

  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });

});