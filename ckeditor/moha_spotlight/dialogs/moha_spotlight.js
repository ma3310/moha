CKEDITOR.dialog.add( 'moha_spotlight', function( editor ) {
  return {
    // Dialog window definition will be added here.
    title: 'Moha Spotlight Block Property',
    contents: [
      // Tab 1.
      {
        id: 'default',
        elements: [
          // Dialog window UI elements.
          {
            id: 'type',
            type: 'select',
            label: 'Type',
            items: [
              [ 'primary-area', 'primary-area' ],
              [ 'info-area', 'info-area' ],
              [ 'reference-area', 'reference-area' ],
              [ 'warning-area', 'warning-area' ],
              [ 'danger-area', 'danger-area' ]
            ],
            setup: function( widget ) {
              this.setValue( widget.data.type );
            },
            commit: function( widget ) {
              widget.setData( 'type', this.getValue() );
            }
          }
        ]
      }
    ]
  };
} );