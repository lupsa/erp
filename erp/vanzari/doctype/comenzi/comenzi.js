// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

frappe.ui.form.on("Comenzi", {
    onload(frm) {
        frm.set_query("adresa_de_livrare", function() {
                return {
                    "filters": {
                        denumire_client: frm.doc.client,
                    }
                };
            });

       frm.set_query("nume_prenume", function() {
               return {
                   "filters": {
                       compania: frm.doc.client,
                   }
               };
       });
    },

}),

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

    data_livrare(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        if(row.data_livrare < frm.doc.data_comenzii){
            row.data_livrare = '';
            frappe.throw(__('Data de livrare este mai mică decât data comenzii'));
        }
    },

})
