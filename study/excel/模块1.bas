Attribute VB_Name = "ģ��1"
Sub ����_Click()
If Not CheckIsExistsSheetName("Summary") Then
    MsgBox "���ܱ����ڣ��������ɣ�"
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Summary"
Else
     MsgBox "���ܱ��Ѵ��ڣ�ɾ�����������ɣ�"
    Application.DisplayAlerts = False
    Worksheets("Summary").Delete
    Application.DisplayAlerts = True
    Worksheets.Add After:=Sheets(Sheets.Count)
    Sheets(Sheets.Count).Name = "Summary"
End If
'Worksheets.Add after:=Sheets(Sheets.Count) '����µĹ��������ڴ������
For i = 1 To Sheets.Count - 1 '�������й�����������ӵĹ�������
    If i = 1 Then
       Sheets(i).Rows(1).Copy
       Sheets(Sheets.Count).Range("A1").PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False 'ȡ��Ӧ�ó�����ģʽ
       Sheets(i).Rows(2).Copy
       Sheets(Sheets.Count).Range("A2").PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False
    Else
       Sheets(i).Rows(2).Copy
       Sheets(Sheets.Count).Range("A" & i + 1).PasteSpecial Paste:=xlPasteValues
       Application.CutCopyMode = False
    End If
'Sheets(i).Rows(2).Copy Sheets(Sheets.Count).Range("A" & i) ��ÿ��������ĵ�һ�У����Ƶ��¹������ӵ�һ�п�ʼ���������ۼ�
Next i
    Range("B:B,C:C").Select
    Range("C1").Activate
    Selection.NumberFormatLocal = "yyyy/m/d"
    Columns("N:N").Select
    Selection.NumberFormatLocal = "m""��""d""��"";@"
    MsgBox "���ܱ������ɣ�"
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
