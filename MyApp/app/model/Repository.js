Ext.define("MyApp.model.Repository", {
    extend: "Ext.data.Model",
    fields: [
        {name: "RepositoryId"},
        {name: "RepositoryCode"},
        {name: "RepositoryName"},
        {name: "Address"},
        {name:"ModifiedDate",type:"date"}
    ],
  });
  