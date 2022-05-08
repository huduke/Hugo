Attribute VB_Name = "模块1"
Sub 汇总_Click()
If Not CheckIsExistsSheetName("Summary") Then
    MsgBox "汇总表不存在，重新生成！"
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Summary"
Else
     MsgBox "汇总表已存在，删除再重新生成！"
    Application.DisplayAlerts = False
    Worksheets("Summary").Delete
    Application.DisplayAlerts = True
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Summary"
End If
'Worksheets.Add after:=Sheets(Sheets.Count) '添加新的工作表，用于存放数据
For i = 1 To Sheets.Count - 1 '遍历所有工作表，除新添加的工作表外
    If i = 1 Then
       Sheets(i).Rows(1).Copy
       Sheets(Sheets.Count).Range("A1").PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False '取消应用程序复制模式
       Sheets(i).Rows(2).Copy
       Sheets(Sheets.Count).Range("A2").PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False
    Else
       Sheets(i).Rows(2).Copy
       Sheets(Sheets.Count).Range("A" & i + 1).PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False
    End If
'Sheets(i).Rows(2).Copy Sheets(Sheets.Count).Range("A" & i) 将每个工作表的第一行，复制到新工作表，从第一行开始依次往下累加
Next i
    Range("B:B,C:C").Select
    Range("C1").Activate
    Selection.NumberFormatLocal = "yyyy/m/d"
    Columns("N:N").Select
    Selection.NumberFormatLocal = "m""月""d""日"";@"
    MsgBox "汇总表已生成！"
End Sub


Function CheckIsExistsSheetName(ByVal SheetName) As Boolean
    CheckIsExistsSheetName = False
    Dim sheet As Worksheet
    For Each sheet In ThisWorkbook.Sheets
        If sheet.Name = SheetName Then
            CheckIsExistsSheetName = True
            Exit Function
        End If
    Next
End Function
