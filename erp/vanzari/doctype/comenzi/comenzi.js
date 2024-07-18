// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

frappe.ui.form.on("Comenzi", {
    onload(frm, cdt, cdn) {
        console.log(frm.doc)
       frm.set_query("nume_prenume", function() {
            return {
                "filters": {
                    compania: frm.doc.client,
                }
            };
       });

        frm.set_query("adresa_de_livrare", 'produse_comandate', function() {
            return {
                "filters": {
                    denumire_client: frm.doc.client,
                }
            };
        });

        frm.set_query("lista_operatii_cda", 'produse_comandate', function(doc, cdt, cdn) {
            let row = frappe.get_doc(cdt, cdn);
            return {
                "filters": {
                    denumire_produs: row.denumire_produs,
                }
            };
        });

    },


}),

frappe.ui.form.on('Comenzi lista de produse', {
	pret_eur(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate_comandata;
        frm.refresh(cdn.total);
	},

	cantitate_comandata(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate_comandata;
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
