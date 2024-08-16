// Copyright (c) 2024, Darius and contributors
// For license information, please see license.txt

frappe.ui.form.on("Open Orders", {

    after_save(frm, cdt, cdn) {
        let produse_comandate = frm.doc.produse_comandate;
        for(let i = 0; i < produse_comandate.length; i++) {
            let row = frappe.get_doc(produse_comandate[i].doctype, produse_comandate[i].name)

            for(let i_row = 1; i_row <= row.cantitate_comandata; i_row++) {
                frappe.db.insert({
                    "doctype": 'Comenzi Productie',
                    "numar_comanda_client": frm.doc.nr_comanda_client,
                    "cod_client": frm.doc.cod_client,
                    "client": frm.doc.client,
                    "denumire_produs": row.denumire_produs,
                    "numar_curent_produs": i_row,
                    "total_produse_comandate": row.cantitate_comandata,
                    "data_livrare": row.data_livrare,
                    "situatie_operatii": [{

                    }]
                }).then(function(doc) { 
                    frappe.msgprint({
                        title: __('Lansare Comanda Productie'),
                        indicator: 'green',
                        message: __(`Comanda ${doc.name} pentru produsul ${doc.denumire_produs} a fost lansată`)
                    });

                    let row_comenzi_productie = frm.add_child('tabel_comenzi_productie');
                    row_comenzi_productie.numar_comanda_productie = doc.name;
                    row_comenzi_productie.denumire_produs = doc.denumire_produs;
                    row_comenzi_productie.data_lansare_comanda_productie = doc.creation;

                    frm.refresh_field('tabel_comenzi_productie');

                });
            }
        }
        frm.save();
    },

    onload(frm, cdt, cdn) {
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

frappe.ui.form.on('Open Orders lista de produse', {
	pret_eur(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate_comandata;
        frm.refresh(cdn.total);
	},

	cantitate_comandata(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.total = row.pret_eur * row.cantitate_comandata;
        frm.refresh(cdn.total);

        row.cantitate_ramasa = row.cantitate_comandata - row.cantitate_livrata;
        frm.refresh(cdn.cantitate_ramasa);
	},

	cantitate_livrata(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);

        row.cantitate_ramasa = row.cantitate_comandata - row.cantitate_livrata;
        frm.refresh(cdn.cantitate_ramasa);
	},

    data_livrare(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        if(row.data_livrare < frm.doc.data_comenzii){
            row.data_livrare = '';
            frappe.throw(__('Data de livrare este mai mică decât data comenzii'));
        }

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                'doctype': 'Comenzi Productie',
                'filters': {
                    'numar_comanda_client': frm.doc.nr_comanda_client,
                    'denumire_produs': row.denumire_produs
                },

                'fieldname': [
                    'data_livrare'
                ]
            },
            callback: function(r) {
                let val = r.message;
                val.forEach((el) => {
                    frappe.db.set_value('Comenzi Productie', el.name, 'data_livrare', row.data_livrare);
                    frappe.show_alert({
                        title: __('Data Livrare Modificată'),
                        indicator: 'green',
                        message: __(`Data de livrare la comanda ${el.name} pentru produsul ${row.denumire_produs} a fost modificată pentru ${row.data_livrare}`)
                    });

                });
                if (frm.doc.docstatus == 1){
                    frm.save('Update');
                }
                
            }
        });

    },


})
