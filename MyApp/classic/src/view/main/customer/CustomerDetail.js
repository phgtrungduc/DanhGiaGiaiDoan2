Ext.define("MyApp.view.main.customer.CustomerDetail", {
  xtype: "CustomerDetail",
  extend: "Ext.window.Window",
  height: 450,
  width: 750,
  layout: "fit",
  title: "Khách hàng",
  state: "",
  controller: "CustomerDetail",
  viewModel: {
    type: "CustomerDetailModel", // references alias "viewmodel.test"
  },
  listeners: {
    beforeclose: function (win) {
      Ext.ComponentQuery.query("[xtype='app-main']")[0].unmask();
      if (win.closeMe) {
        win.closeMe = false;
        return true;
      }
      if (win.state === "" || win.state === "cancle") {
        Ext.Msg.show({
          width: 500,
          buttonAlign: "right",
          title: "CukCuk - Quản lý nhà hàng",
          msg: "Dữ liệu thay đổi, bạn có muốn cất không?",
          buttonText: { no: "Có", yes: "Không", cancel: "Hủy bỏ" },
          callback: function (btn) {
            if (btn === "yes") {
              win.closeMe = true;
              win.close();
            } else if (btn === "no") {
              win.state = "add";
              win.getController().pressButtonInBottom({ state: "save" });
            }
          },
        });
      }
      return false;
    },
  },
  initComponent: function () {
    try {
      var me = this;
      Ext.apply(me, { items: me.getContentItems() });
      this.callParent(arguments);
    } catch (ex) {
      console.error(ex);
    }
  },
  style: {
    "background-color": "white",
  },
  itemId: "CustomerFormDetail",
  bbar: [
    {
      xtype: "button",
      text: "Giúp",

      cls: "m-btn right-10",
      iconCls: "help-button",
    },
    { xtype: "tbfill" },
    {
      xtype: "button",
      text: "Cất",
      cls: "m-btn right-10",
      iconCls: "save-button",
      state: "save",
      handler: "pressButtonInBottom",
    },
    {
      xtype: "button",
      text: "Cất và thêm",
      cls: "m-btn right-10",
      iconCls: "save-button",
      state: "saveandadd",
      handler: "pressButtonInBottom",
      itemId:"save_add_button"
    },
    {
      xtype: "button",
      text: "Hủy bỏ",
      cls: "m-btn right-10",
      iconCls: "close-button",
      state: "cancle",
      handler: "pressButtonInBottom",
    },
  ],
  getContentItems: function () {
    return {
      xtype: "form",
      cls: "detail-form",
      padding: "10 10 10 10",
      itemId: "customer-form",
      items: [
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Mã khách hàng (*)",
              name: "CustomerCode",
              labelWidth: 150,
              flex: 1,
              width: 500,
              bind: "{formData.CustomerCode}",
              padding: "0 5 0 0",
              readOnly: true,
              allowBlank: false,
              blankText: "Mã khách hàng không được để trống",
            },
            {
              xtype: "textfield",
              fieldLabel: "Tên khách hàng (*)",
              name: "FullName",
              labelWidth: 150,
              flex: 1,
              width: 500,
              bind: "{formData.FullName}",
              allowBlank: false,
              blankText: "Tên khách hàng không được để trống",
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Mã thẻ thành viên",
              name: "MemberCardCode",
              labelWidth: 150,
              flex: 1,

              bind: "{formData.MemberCardCode}",
              padding: "0 5 0 0",
            },
            {
              xtype: "tbfill",
              flex: 1,
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Điện thoại di động (*)",
              name: "PhoneNumber",
              labelWidth: 150,
              flex: 1,
              bind: "{formData.PhoneNumber}",
              padding: "0 5 0 0",
              allowBlank: false,
              blankText: "Số điện thoại không được để trống",
            },
            {
              xtype: "tbfill",
              flex: 1,
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "datefield",
              fieldLabel: "Ngày sinh",
              name: "DateOfBirth",
              labelWidth: 150,
              bind: "{formData.DateOfBirth}",
              flex: 1,
              padding: "0 5 0 0",
            },
            {
              xtype: "tbfill",
              flex: 1,
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Tên công ty",
              name: "CompanyName",
              labelWidth: 150,
              bind: "{formData.CompanyName}",
              flex: 1,
              padding: "0 5 0 0",
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Mã số thuế",
              name: "PersonalTaxCode",
              labelWidth: 150,
              flex: 1,
              width: 500,
              bind: "{formData.CompanyTaxCode}",
              padding: "0 5 0 0",
            },
            {
              xtype: "textfield",
              fieldLabel: "Email",
              name: "Email",
              labelWidth: 150,
              flex: 1,
              width: 500,
              bind: "{formData.Email}",
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Địa chỉ",
              name: "Address",
              labelWidth: 150,
              bind: "{formData.Address}",
              flex: 1,
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          padding: "0 0 5 0",
          items: [
            {
              xtype: "textareafield",
              fieldLabel: "Ghi chú",
              name: "Description",
              labelWidth: 150,
              bind: "{formData.Description}",
              flex: 1,

              grow: true,
            },
          ],
        },
      ],
    };
  },
  //   init:function(){
  //     var a  = this.getViewModel("");
  //     a.load({
  //       param: '{id:""}',
  //       succsess:function(res){

  //       }

  //     });
  //   },

  //   show:function(masterDate){
  //     var me = this;
  //     var wd  = me.getView();
  //     wd.show();
  //   }
});
