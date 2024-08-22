# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

import frappe
import json

@frappe.whitelist()
def generare_comanda_productie(doc):
    doc_dict = json.loads(doc)
    produse_comandate = doc_dict['produse_comandate']

    for row in produse_comandate:
        operatii = []
        op = frappe.get_doc("Lista Operatii", row['lista_operatii_cda'])
        for op_row in op.lista_operatii:
            operatii.append({
                "operatia": op_row.operatia,
                "numar_ore_manopera": op_row.ore_manopera,
                "obvervatii": op_row.observatii,
                })

    return doc_dict
