export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site content')
        .child(
          S.list()
            .title('Site content')
            .items([
              S.listItem()
                .title('Home')
                .child(S.document().schemaType('pageContent').documentId('page-home')),
              S.listItem()
                .title('About')
                .child(S.document().schemaType('pageContent').documentId('page-about')),
              S.listItem()
                .title('Updates page')
                .child(S.document().schemaType('pageContent').documentId('page-updates')),
              S.listItem()
                .title('Projects page')
                .child(S.document().schemaType('pageContent').documentId('page-projects')),
              S.listItem()
                .title('Resources page')
                .child(S.document().schemaType('pageContent').documentId('page-resources')),
              S.listItem()
                .title('Research page')
                .child(S.document().schemaType('pageContent').documentId('page-research')),
              S.listItem()
                .title('Trajectory page')
                .child(S.document().schemaType('pageContent').documentId('page-trajectory')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'pageContent'),
    ])
