let closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.Add_Session.helpers({
  modalType( type ) {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === type;
    }
  },
  modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'Add',
        label: eventModal.type === 'Add an'
      };
    }
  },
  selected( v1, v2 ) {
    return v1 === v2;
  },
  event() {
    let eventModal = 'Add';

    if ( eventModal ) {
      return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
        start: eventModal.date,
        end: eventModal.date
      };
    }
  }
});

Template.Add_Session.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let eventModal = 'Add',
        submitType = 'addEvent',
        eventItem  = {
          title: template.find( '[name="title"]' ).value,
          start: "2016-10-03",
          end: "2016-10-03",
          type: template.find( '[name="type"] option:selected' ).value,
          guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
        };

    if ( submitType === 'editEvent' ) {
      eventItem._id   = eventModal.event;
    }

    Meteor.call( submitType, eventItem, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
        closeModal();
      }
    });

    FlowRouter.go("events");
  }
});