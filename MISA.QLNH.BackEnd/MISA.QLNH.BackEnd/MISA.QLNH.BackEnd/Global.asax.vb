Imports System.IO
Imports System.Net.Http.Formatting
Imports System.Web.Http
Imports System.Web.Optimization
Imports MISA.QLNH.BO
Imports Newtonsoft.Json

Public Class Global_asax
    Inherits HttpApplication

    Sub ConfigureApi(config As HttpConfiguration)
        config.Formatters.Remove(config.Formatters.JsonFormatter)

    End Sub

    Sub Application_BeginRequest(sender As Object, e As EventArgs)
        Dim Context = HttpContext.Current
        Dim Response = Context.Response
        Response.AddHeader("Access-Control-Allow-Origin", "*")
        If (Context.Request.HttpMethod = "OPTIONS") Then
            Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            Response.AddHeader("Access-Control-Allow-Headers", "*")
            Response.End()
        End If

    End Sub
End Class