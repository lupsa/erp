// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Comenzi", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Comenzi lista de produse', {
	pret_eur(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate;
        frm.refresh(cdn.total);
	},

	cantitate(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate;
        frm.refresh(cdn.total);
	},
})
