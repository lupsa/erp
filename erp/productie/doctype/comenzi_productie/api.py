import frappe
import json

@frappe.whitelist()
def update_produse_livrate(doc):
    doc_dict = json.loads(doc)

    try:
        open_order = frappe.get_doc("Open Orders", doc_dict["numar_comanda_client"])
        for item in open_order.produse_comandate:
            if item.denumire_produs == doc_dict["denumire_produs"]:
                frappe.db.set_value(item.doctype, item.name, {
                    'cantitate_livrata': int(item.cantitate_livrata) + 1,
                    'cantitate_ramasa': int(item.cantitate_ramasa) - 1,
                    })
        return item
    except:
        return "No"


