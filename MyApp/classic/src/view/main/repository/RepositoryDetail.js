Ext.define("MyApp.view.main.repository.RepositoryDetail", {
  xtype: "RepositoryDetail",
  extend: "Ext.window.Window",
  height: 300,
  width: 450,
  layout: "fit",
  title: "Kho",
  state: "",
  controller: "RepositoryDetail",
  viewModel: {
    type: "RepositoryDetail", // references alias "viewmodel.RepositoryDetail"
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
              alert("Cất");
              win.closeMe = true;
              win.close();
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
  itemId: "RepositoryFormDetail",
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
      itemId: "save_add_button",
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
      itemId: "repository-form",
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
              fieldLabel: "Mã kho (*)",
              name: "RepositoryCode",
              labelWidth: 100,
              bind: "{formData.RepositoryCode}",
              flex: 1,
              padding: "0 5 0 0",
              allowBlank: false,
              readOnly:true
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
              fieldLabel: "Tên kho (*)",
              name: "RepositoryName",
              labelWidth: 100,
              bind: "{formData.RepositoryName}",
              flex: 1,
              padding: "0 5 0 0",
              allowBlank: false,
            },
          ],
        },
        {
          layout: {
            type: "hbox",
            pack: "start",
            align: "stretch",
          },
          
          padding: "0 5 0 0",
          items: [
            {
              xtype: "textareafield",
              fieldLabel: "Địa chỉ",
              name: "Address",
              labelWidth: 100,
              bind: "{formData.Address}",
              flex: 1,
              grow: true,
            },
          ],
        },
      ],
    };
  },
});
