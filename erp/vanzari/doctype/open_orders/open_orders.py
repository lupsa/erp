# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries


class OpenOrders(Document):
    def autoname(self):
        self.name = self.nr_comanda_client

