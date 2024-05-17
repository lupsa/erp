# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
import datetime
from frappe.model.document import Document
from frappe.model.naming import getseries


class Comenzi(Document):
    def autoname(self):
        year = self.data_comenzii[2:4]
        
        name_prefix = "{}{}".format(year, self.cod_client)
        seria = getseries(name_prefix, 3)
        self.name = name_prefix + seria

