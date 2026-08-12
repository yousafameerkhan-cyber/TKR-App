import re

with open('public/customer.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the order card rendering logic in customer.html to properly reflect live order status steps
old_render_block = """container.innerHTML = orders.map(order => {"""

# Let's write a robust script or replace the status steps rendering section
print("Updating customer.html UI rendering logic...")
