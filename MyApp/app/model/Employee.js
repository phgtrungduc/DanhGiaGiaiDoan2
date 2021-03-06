Ext.define("MyApp.model.Employee", {
  extend: "Ext.data.Model",
  fields: [
    {name: "EmployeeId" },
    {name: "EmployeeCode" },
    {name: "FullName" },
    {name: "Gender"},
    {name: "DateOfBirth" ,type:"date"},
    {name: "Address" },
    {name: "Email" },
    {name: "PhoneHomeNumber" },
    {name: "PhoneNumber" },
    {name: "IdentityNumber" },
    {name: "IdentityDate",type:"date" },
    {name: "IdentityPlace" },
    {name: "JoinDate",type:"date" },
    { name: "Salary" },
    { name: "WorkStatus" },
    { name: "Nationality" },
    { name: "City" },
    { name: "District" },
    { name: "Ward"  },
  ],
});
