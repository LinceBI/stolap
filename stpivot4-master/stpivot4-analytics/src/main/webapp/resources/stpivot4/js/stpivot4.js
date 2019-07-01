
function insertBeforeAndAfterRange(jqInput, textBefore, textAfter) {
	if (jqInput.range().length==0) {
		jqInput.selectAll();
	} 
	
	jqInput.range(textBefore + jqInput.range().text + textAfter );
	
}

function completeMdxConditional(editor) {
	try{
		if (!document.getElementById('chkMdxEditorAutocomplete').checked) {
			return null;
		}
	}catch(e){}
	
	completeMdx(editor)
}
