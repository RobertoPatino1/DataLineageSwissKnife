        // Mock data for demonstration
        const mockData = {
            tables: {
                customers: {
                    dependencies: {
                        upstream: [],
                        downstream: ['orders', 'customer_analytics']
                    },
                    totalDeps: 2,
                    description: 'Tabla principal de clientes con información personal y de contacto'
                },
                orders: {
                    dependencies: {
                        upstream: ['customers', 'products'],
                        downstream: ['order_details', 'shipping', 'invoices']
                    },
                    totalDeps: 5,
                    description: 'Registro de órdenes de compra con referencias a clientes y productos'
                },
                products: {
                    dependencies: {
                        upstream: ['categories', 'suppliers'],
                        downstream: ['order_details', 'inventory']
                    },
                    totalDeps: 4,
                    description: 'Catálogo de productos con información de categorías y proveedores'
                },
                order_details: {
                    dependencies: {
                        upstream: ['orders', 'products'],
                        downstream: ['inventory_movements']
                    },
                    totalDeps: 3,
                    description: 'Detalle de cada ítem en las órdenes de compra'
                },
                inventory: {
                    dependencies: {
                        upstream: ['products', 'suppliers'],
                        downstream: ['inventory_movements', 'reorder_alerts']
                    },
                    totalDeps: 4,
                    description: 'Control de inventario y stock disponible'
                },
                suppliers: {
                    dependencies: {
                        upstream: [],
                        downstream: ['products', 'inventory', 'purchase_orders']
                    },
                    totalDeps: 3,
                    description: 'Información de proveedores y datos de contacto'
                },
                categories: {
                    dependencies: {
                        upstream: [],
                        downstream: ['products', 'category_analytics']
                    },
                    totalDeps: 2,
                    description: 'Clasificación jerárquica de productos'
                }
            },
            
            storedProcedures: {
                'add-column': {
                    customers: { critical: 2, warning: 3, safe: 8 },
                    orders: { critical: 5, warning: 4, safe: 6 },
                    products: { critical: 3, warning: 5, safe: 7 },
                    order_details: { critical: 4, warning: 2, safe: 9 },
                    inventory: { critical: 6, warning: 3, safe: 5 },
                    suppliers: { critical: 1, warning: 4, safe: 10 },
                    categories: { critical: 2, warning: 2, safe: 11 }
                },
                'remove-column': {
                    customers: { critical: 8, warning: 4, safe: 3 },
                    orders: { critical: 12, warning: 2, safe: 1 },
                    products: { critical: 9, warning: 3, safe: 3 },
                    order_details: { critical: 11, warning: 2, safe: 2 },
                    inventory: { critical: 10, warning: 3, safe: 2 },
                    suppliers: { critical: 6, warning: 5, safe: 4 },
                    categories: { critical: 4, warning: 6, safe: 5 }
                },
                'change-datatype': {
                    customers: { critical: 6, warning: 5, safe: 4 },
                    orders: { critical: 9, warning: 3, safe: 3 },
                    products: { critical: 7, warning: 4, safe: 4 },
                    order_details: { critical: 8, warning: 3, safe: 4 },
                    inventory: { critical: 8, warning: 4, safe: 3 },
                    suppliers: { critical: 4, warning: 6, safe: 5 },
                    categories: { critical: 3, warning: 7, safe: 5 }
                },
                'truncate-table': {
                    customers: { critical: 15, warning: 0, safe: 0 },
                    orders: { critical: 15, warning: 0, safe: 0 },
                    products: { critical: 15, warning: 0, safe: 0 },
                    order_details: { critical: 15, warning: 0, safe: 0 },
                    inventory: { critical: 15, warning: 0, safe: 0 },
                    suppliers: { critical: 15, warning: 0, safe: 0 },
                    categories: { critical: 15, warning: 0, safe: 0 }
                },
                'drop-table': {
                    customers: { critical: 15, warning: 0, safe: 0 },
                    orders: { critical: 15, warning: 0, safe: 0 },
                    products: { critical: 15, warning: 0, safe: 0 },
                    order_details: { critical: 15, warning: 0, safe: 0 },
                    inventory: { critical: 15, warning: 0, safe: 0 },
                    suppliers: { critical: 15, warning: 0, safe: 0 },
                    categories: { critical: 15, warning: 0, safe: 0 }
                }
            },
            
            spDetails: {
                'sp_GetCustomerOrders': { 
                    impact: 'critical', 
                    description: 'Consulta principal de órdenes por cliente',
                    affectedTables: ['customers', 'orders', 'order_details']
                },
                'sp_UpdateInventory': { 
                    impact: 'critical', 
                    description: 'Actualización crítica de inventario',
                    affectedTables: ['inventory', 'products', 'suppliers']
                },
                'sp_ProcessPayment': { 
                    impact: 'critical', 
                    description: 'Procesamiento de pagos',
                    affectedTables: ['orders', 'customers', 'invoices']
                },
                'sp_CustomerAnalytics': { 
                    impact: 'critical', 
                    description: 'Análisis de comportamiento de clientes',
                    affectedTables: ['customers', 'orders']
                },
                'sp_ProductCatalog': { 
                    impact: 'critical', 
                    description: 'Gestión del catálogo de productos',
                    affectedTables: ['products', 'categories', 'suppliers']
                },
                'sp_GenerateReport': { 
                    impact: 'warning', 
                    description: 'Generación de reportes mensuales',
                    affectedTables: ['orders', 'products', 'customers']
                },
                'sp_InventoryAlert': { 
                    impact: 'warning', 
                    description: 'Alertas de inventario bajo',
                    affectedTables: ['inventory', 'products']
                },
                'sp_OrderTracking': { 
                    impact: 'warning', 
                    description: 'Seguimiento de órdenes',
                    affectedTables: ['orders', 'shipping']
                },
                'sp_CategoryStats': { 
                    impact: 'warning', 
                    description: 'Estadísticas por categoría',
                    affectedTables: ['categories', 'products']
                },
                'sp_SupplierReport': { 
                    impact: 'warning', 
                    description: 'Reportes de proveedores',
                    affectedTables: ['suppliers', 'products']
                },
                'sp_BackupData': { 
                    impact: 'safe', 
                    description: 'Respaldo de datos históricos',
                    affectedTables: ['all_tables']
                },
                'sp_CleanupLogs': { 
                    impact: 'safe', 
                    description: 'Limpieza de logs antiguos',
                    affectedTables: ['system_logs']
                },
                'sp_SystemHealth': { 
                    impact: 'safe', 
                    description: 'Verificación de salud del sistema',
                    affectedTables: ['system_info']
                },
                'sp_UserMaintenance': { 
                    impact: 'safe', 
                    description: 'Mantenimiento de usuarios',
                    affectedTables: ['user_sessions']
                },
                'sp_DataArchive': { 
                    impact: 'safe', 
                    description: 'Archivo de datos antiguos',
                    affectedTables: ['archive_tables']
                }
            }
        };

        let cy = null; // Cytoscape instance
        let tableTooltip = document.getElementById('table-info');
        let currentTheme = 'dark';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            // Initialize theme (default to dark since localStorage not available)
            setTheme('dark');
        });

        function setupEventListeners() {
            // Lineage Analysis
            document.getElementById('analyze-lineage').addEventListener('click', analyzeLineage);
            
            // Impact Analysis
            document.getElementById('analyze-impact').addEventListener('click', analyzeImpact);
        }

        function toggleTheme() {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        }

        function setTheme(theme) {
            currentTheme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update theme toggle button
            const toggleBtn = document.querySelector('.theme-toggle');
            toggleBtn.className = `theme-toggle ${theme}`;
            
            // Regenerate graph if it exists to update colors
            if (cy && cy.elements().length > 0) {
                const centerNode = cy.nodes('[role="center"]').first();
                if (centerNode.length > 0) {
                    const tableId = centerNode.id();
                    const tableData = mockData.tables[tableId];
                    if (tableData) {
                        generateLineageGraph(tableId, tableData);
                    }
                }
            }
        }

        function switchModule(moduleId) {
            // Update navigation
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[onclick="switchModule('${moduleId}')"]`).classList.add('active');
            
            // Update modules
            document.querySelectorAll('.module').forEach(module => module.classList.remove('active'));
            document.getElementById(`${moduleId}-module`).classList.add('active');
        }

        function analyzeLineage() {
            const selectedTable = document.getElementById('lineage-table').value;
            if (!selectedTable) {
                alert('Por favor selecciona una tabla');
                return;
            }
            
            // Show loading
            const btn = document.getElementById('analyze-lineage');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<div class="spinner"></div> <span>Analizando...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                const tableData = mockData.tables[selectedTable];
                
                // Update stats
                document.getElementById('total-dependencies').textContent = tableData.totalDeps;
                document.getElementById('upstream-tables').textContent = tableData.dependencies.upstream.length;
                document.getElementById('downstream-tables').textContent = tableData.dependencies.downstream.length;
                
                // Generate graph
                generateLineageGraph(selectedTable, tableData);
                
                // Show results
                document.getElementById('lineage-result').classList.remove('hidden');
                
                // Reset button
                btn.innerHTML = originalHtml;
                btn.disabled = false;
                
                // Scroll to results
                document.getElementById('lineage-result').scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        }

        function generateLineageGraph(selectedTable, tableData) {
            const graphContainer = document.getElementById('lineage-graph');
            
            if (cy) {
                cy.destroy();
            }

            // Build elements for Cytoscape
            const elements = [];

            // Central node
            elements.push({
                data: { 
                    id: selectedTable, 
                    label: selectedTable, 
                    role: 'center',
                    description: mockData.tables[selectedTable]?.description || 'Tabla del sistema'
                }
            });

            // Upstream nodes (sources)
            tableData.dependencies.upstream.forEach(table => {
                elements.push({ 
                    data: { 
                        id: table, 
                        label: table, 
                        role: 'upstream',
                        description: mockData.tables[table]?.description || 'Tabla del sistema'
                    } 
                });
                elements.push({ 
                    data: { 
                        id: `${table}->${selectedTable}`, 
                        source: table, 
                        target: selectedTable 
                    } 
                });
            });

            // Downstream nodes (targets)
            tableData.dependencies.downstream.forEach(table => {
                elements.push({ 
                    data: { 
                        id: table, 
                        label: table, 
                        role: 'downstream',
                        description: mockData.tables[table]?.description || 'Tabla del sistema'
                    } 
                });
                elements.push({ 
                    data: { 
                        id: `${selectedTable}->${table}`, 
                        source: selectedTable, 
                        target: table 
                    } 
                });
            });

            // Create Cytoscape instance
            cy = cytoscape({
                container: graphContainer,
                elements: elements,
                wheelSensitivity: 0.2,
                layout: {
                    name: 'breadthfirst',
                    directed: true,
                    roots: `#${selectedTable}`,
                    spacingFactor: 1.5,
                    animate: true,
                    animationDuration: 800
                },
                style: [
                    // Base node style
                    {
                        selector: 'node',
                        style: {
                            'shape': 'round-rectangle',
                            'width': 'label',
                            'height': 'label',
                            'padding': '12px 18px',
                            'background-color': getComputedStyle(document.documentElement).getPropertyValue('--node-upstream').trim(),
                            'label': 'data(label)',
                            'font-size': 14,
                            'font-weight': 600,
                            'color': getComputedStyle(document.documentElement).getPropertyValue('--white').trim(),
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'text-wrap': 'wrap',
                            'text-max-width': 120,
                            'border-width': 2,
                            'border-color': getComputedStyle(document.documentElement).getPropertyValue('--node-upstream-border').trim(),
                            'transition-property': 'background-color, border-color, transform',
                            'transition-duration': '0.3s',
                            'box-shadow-blur': 15,
                            'box-shadow-color': 'rgba(0,0,0,0.3)',
                            'box-shadow-opacity': 0.8,
                            'box-shadow-offset-x': 0,
                            'box-shadow-offset-y': 3
                        }
                    },
                    // Upstream nodes (Magenta family)
                    {
                        selector: 'node[role = "upstream"]',
                        style: {
                            'background-color': getComputedStyle(document.documentElement).getPropertyValue('--node-upstream').trim(),
                            'border-color': getComputedStyle(document.documentElement).getPropertyValue('--node-upstream-border').trim(),
                            'box-shadow-color': 'rgba(233, 30, 99, 0.4)'
                        }
                    },
                    // Downstream nodes (Blue family)
                    {
                        selector: 'node[role = "downstream"]',
                        style: {
                            'background-color': getComputedStyle(document.documentElement).getPropertyValue('--node-downstream').trim(),
                            'border-color': getComputedStyle(document.documentElement).getPropertyValue('--node-downstream-border').trim(),
                            'box-shadow-color': 'rgba(33, 150, 243, 0.4)'
                        }
                    },
                    // Central node (Orange accent)
                    {
                        selector: 'node[role = "center"]',
                        style: {
                            'background-color': getComputedStyle(document.documentElement).getPropertyValue('--node-center').trim(),
                            'border-color': getComputedStyle(document.documentElement).getPropertyValue('--node-center-border').trim(),
                            'border-width': 3,
                            'font-size': 16,
                            'font-weight': 700,
                            'box-shadow-color': 'rgba(255, 107, 53, 0.5)',
                            'box-shadow-blur': 20
                        }
                    },
                    // Node hover
                    {
                        selector: 'node:hover',
                        style: {
                            'transform': 'scale(1.1)',
                            'z-index': 10,
                            'border-width': 3,
                            'box-shadow-blur': 25,
                            'box-shadow-opacity': 1
                        }
                    },
                    // Edges
                    {
                        selector: 'edge',
                        style: {
                            'curve-style': 'straight',
                            'line-color': getComputedStyle(document.documentElement).getPropertyValue('--edge-color').trim(),
                            'width': 3,
                            'target-arrow-shape': 'triangle',
                            'target-arrow-color': getComputedStyle(document.documentElement).getPropertyValue('--edge-color').trim(),
                            'arrow-scale': 1.5,
                            'opacity': 0.8,
                            'transition-property': 'line-color, target-arrow-color, width',
                            'transition-duration': '0.3s'
                        }
                    },
                    // Edge hover
                    {
                        selector: 'edge:hover',
                        style: {
                            'line-color': getComputedStyle(document.documentElement).getPropertyValue('--edge-hover').trim(),
                            'target-arrow-color': getComputedStyle(document.documentElement).getPropertyValue('--edge-hover').trim(),
                            'width': 4,
                            'opacity': 1
                        }
                    }
                ]
            });

            // Fit with animation
            cy.ready(() => {
                cy.fit(cy.elements(), 50);
            });

            // Node click event
            cy.on('tap', 'node', function(evt) {
                const node = evt.target;
                const tableId = node.id();
                const tableData = mockData.tables[tableId];
                
                if (tableData && tableId !== selectedTable) {
                    // Regenerate graph with clicked table as center
                    generateLineageGraph(tableId, tableData);
                    
                    // Update stats
                    document.getElementById('total-dependencies').textContent = tableData.totalDeps;
                    document.getElementById('upstream-tables').textContent = tableData.dependencies.upstream.length;
                    document.getElementById('downstream-tables').textContent = tableData.dependencies.downstream.length;
                    
                    // Update selector
                    document.getElementById('lineage-table').value = tableId;
                }
            });

            // Node hover events for tooltip
            cy.on('mouseover', 'node', function(evt) {
                const node = evt.target;
                const data = node.data();
                showTableTooltip(evt.originalEvent, data.label, data.description);
            });

            cy.on('mouseout', 'node', function(evt) {
                hideTableTooltip();
            });
        }

        function showTableTooltip(event, tableName, description) {
            const tooltip = document.getElementById('table-info');
            tooltip.innerHTML = `
                <h4><i class="fas fa-table"></i> ${tableName}</h4>
                <p>${description}</p>
            `;
            tooltip.style.display = 'block';
            tooltip.style.left = (event.pageX + 10) + 'px';
            tooltip.style.top = (event.pageY - 10) + 'px';
        }

        function hideTableTooltip() {
            document.getElementById('table-info').style.display = 'none';
        }

        function analyzeImpact() {
            const selectedTable = document.getElementById('impact-table').value;
            const selectedAction = document.getElementById('impact-action').value;
            
            if (!selectedTable || !selectedAction) {
                alert('Por favor selecciona una tabla y una acción');
                return;
            }
            
            // Show loading
            const btn = document.getElementById('analyze-impact');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<div class="spinner"></div> <span>Analizando...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                const impactData = mockData.storedProcedures[selectedAction][selectedTable];
                
                // Calculate total impact percentage
                const totalSPs = impactData.critical + impactData.warning + impactData.safe;
                const impactPercentage = Math.round(((impactData.critical + impactData.warning) / totalSPs) * 100);
                
                // Update gauge
                updateImpactGauge(impactPercentage);
                
                // Update stats
                document.getElementById('critical-sps').textContent = impactData.critical;
                document.getElementById('warning-sps').textContent = impactData.warning;
                document.getElementById('safe-sps').textContent = impactData.safe;
                
                // Generate SP list
                generateSPList(impactData);
                
                // Show results
                document.getElementById('impact-result').classList.remove('hidden');
                
                // Reset button
                btn.innerHTML = originalHtml;
                btn.disabled = false;
                
                // Scroll to results
                document.getElementById('impact-result').scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        }

        function updateImpactGauge(percentage) {
            const gaugeCircle = document.querySelector('.gauge-circle');
            const gaugePercentage = document.querySelector('.gauge-percentage');
            
            // Update percentage text
            gaugePercentage.textContent = `${percentage}%`;
            
            // Update gauge color based on impact level
            let color1, color2;
            if (percentage >= 70) {
                color1 = '#f44336';
                color2 = '#d32f2f';
            } else if (percentage >= 40) {
                color1 = '#ff9800';
                color2 = '#f57c00';
            } else {
                color1 = '#4caf50';
                color2 = '#388e3c';
            }
            
            // Update gauge visual
            const degrees = (percentage / 100) * 360;
            gaugeCircle.style.background = `conic-gradient(from 0deg, ${color1} 0deg, ${color2} ${degrees}deg, rgba(255, 255, 255, 0.1) ${degrees}deg)`;
        }

        function generateSPList(impactData) {
            const spListContainer = document.getElementById('affected-sps');
            spListContainer.innerHTML = '';
            
            const spNames = Object.keys(mockData.spDetails);
            let spIndex = 0;
            
            // Add critical SPs
            for (let i = 0; i < impactData.critical; i++) {
                if (spIndex < spNames.length) {
                    const spItem = createSPItem(spNames[spIndex], 'critical');
                    spListContainer.appendChild(spItem);
                    spIndex++;
                }
            }
            
            // Add warning SPs
            for (let i = 0; i < impactData.warning; i++) {
                if (spIndex < spNames.length) {
                    const spItem = createSPItem(spNames[spIndex], 'warning');
                    spListContainer.appendChild(spItem);
                    spIndex++;
                }
            }
            
            // Add safe SPs
            for (let i = 0; i < Math.min(impactData.safe, 3); i++) {
                if (spIndex < spNames.length) {
                    const spItem = createSPItem(spNames[spIndex], 'safe');
                    spListContainer.appendChild(spItem);
                    spIndex++;
                }
            }
        }

        function createSPItem(spName, impactLevel) {
            const spItem = document.createElement('div');
            spItem.className = `sp-item ${impactLevel}`;
            
            const spDetails = mockData.spDetails[spName] || { 
                description: 'Stored procedure del sistema',
                affectedTables: ['table1', 'table2'] 
            };
            
            const impactLabels = {
                critical: 'Crítico',
                warning: 'Advertencia',
                safe: 'Sin Impacto'
            };
            
            spItem.innerHTML = `
                <div class="sp-header">
                    <div class="sp-name">
                        <i class="fas fa-cog"></i> ${spName}
                    </div>
                    <div class="sp-impact ${impactLevel}">${impactLabels[impactLevel]}</div>
                </div>
                <div class="sp-details">${spDetails.description}</div>
                <div class="sp-affected-tables">
                    <div class="affected-tables-title">
                        <i class="fas fa-table"></i> Tablas Afectadas:
                    </div>
                    <div class="table-tags">
                        ${spDetails.affectedTables.map(table => 
                            `<span class="table-tag">${table}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            // Add click event to toggle details
            spItem.addEventListener('click', function() {
                spItem.classList.toggle('expanded');
            });
            
            return spItem;
        }

        // Add entrance animations
        document.addEventListener('DOMContentLoaded', function() {
            // Animate stats cards
            const animateElements = () => {
                const elements = document.querySelectorAll('.stat-card, .impact-stat, .sp-item');
                elements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.transition = 'all 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            };

            // Observe result containers
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.target.classList && !mutation.target.classList.contains('hidden')) {
                        setTimeout(animateElements, 100);
                    }
                });
            });

            observer.observe(document.getElementById('lineage-result'), { 
                attributes: true, 
                attributeFilter: ['class'] 
            });
            
            observer.observe(document.getElementById('impact-result'), { 
                attributes: true, 
                attributeFilter: ['class'] 
            });
        });