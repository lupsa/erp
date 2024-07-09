// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

frappe.ui.form.on("Delivery Note", {
    onload(frm){
        frm.set_query("adresa_de_livrare", function() {
            return {
                "filters": {
                    denumire_client: frm.doc.denumire_client,
                }
            };
        });
    },

}),


frappe.ui.form.on("Delivery Note Lista de Produse", {
    form_render(frm, cdt, cdn){
       // let row = frappe.get_doc(cdt, cdn);
       // frm.call('get_comenzi_delivery', {
       //     nr_comanda_interna: row.nr_comanda_interna,
       // }).then(r => {
       //     console.log(r);
       // })
    },

})
