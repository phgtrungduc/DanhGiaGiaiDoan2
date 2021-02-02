Ext.define("MyApp.model.Customer", {
  extend: "Ext.data.Model",
  fields: [
    { name: "CustomerId" },
    { name: "CustomerCode" },
    { name: "FullName" },
    { name: "MemberCardCode" },
    { name: "DateOfBirth",type:"date" },
    { name: "Gender" },
    { name: "Email" },
    { name: "PhoneNumber" },
    { name: "CompanyName" },
    { name: "CompanyTaxCode" },
    { name: "Address" },
  ],
});
