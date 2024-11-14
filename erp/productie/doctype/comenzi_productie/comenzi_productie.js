// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

frappe.ui.form.on("Comenzi Productie", {

    before_submit(frm) {
        frm.doc.situatie_operatii.forEach((el) => {
            if (el.stare_operatie != "Terminat") {
                    frappe.throw(__("Toate operatiile trebuie sa fie 'Terminate'"));
                return false

            }
        } )

    },

    on_submit(frm) {
		frappe.call({
			method: "erp.productie.doctype.comenzi_productie.api.update_produse_livrate",
			args: {
				doc: frm.doc
			},
			callback(r){
                if (r != "No") {
					frappe.show_alert({
						indicator: 'green',
						message: __(`Cantitatea ramasa a fost actualizata`)
					});
                } else {
                    frappe.throw(__('A aparut o eroare in actualizarea cantitatii ramase'));
                }
			}
		});

	},
});
