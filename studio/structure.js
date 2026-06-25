export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .child(S.document().schemaType('siteSettings').documentId('site-settings')),
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
                .title('Credentials page')
                .child(S.document().schemaType('pageContent').documentId('page-credentials')),
              S.listItem()
                .title('Papers page')
                .child(S.document().schemaType('pageContent').documentId('page-papers')),
              S.listItem()
                .title('Ventures page')
                .child(S.document().schemaType('pageContent').documentId('page-ventures')),
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
      ...S.documentTypeListItems().filter(
        (item) => !['pageContent', 'siteSettings'].includes(item.getId())
      ),
    ])
