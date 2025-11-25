// album-viewer/src/utils/viz.ts
// D3.js plot: Selling price of the album by year, x-axis: months, y-axis: albums sold
// Data is loaded from an external JSON source

import * as d3 from 'd3';

export interface AlbumSale {
  album: string;
  year: number;
  month: string; // e.g., 'Jan', 'Feb', ...
  sold: number;
  price: number;
}

/**
 * Render a D3 plot of album sales by month for a given year.
 * @param containerId The DOM element id to render the plot into
 * @param data Array of AlbumSale objects
 * @param year The year to filter and plot
 */
export function renderAlbumSalesPlot(containerId: string, data: AlbumSale[], year: number) {
  // Filter data for the selected year
  const yearData = data.filter(d => d.year === year);
  // Group by month and sum sold
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const salesByMonth = months.map(month => {
    const monthSales = yearData.filter(d => d.month === month);
    return {
      month,
      sold: d3.sum(monthSales, d => d.sold)
    };
  });

  // Set up SVG dimensions
  const margin = { top: 30, right: 30, bottom: 40, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Remove any previous SVG
  d3.select(`#${containerId}`).select('svg').remove();

  const svg = d3.select(`#${containerId}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // X scale
  const x = d3.scaleBand()
    .domain(months)
    .range([0, width])
    .padding(0.1);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(salesByMonth, d => d.sold) || 0])
    .nice()
    .range([height, 0]);

  // X axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Y axis
  svg.append('g')
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll('.bar')
    .data(salesByMonth)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.month)!)
    .attr('y', d => y(d.sold))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.sold))
    .attr('fill', '#69b3a2');

  // Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 10)
    .attr('x', -height / 2)
    .attr('dy', '-1.5em')
    .style('text-anchor', 'middle')
    .text('Albums Sold');

  // X axis label
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 5)
    .style('text-anchor', 'middle')
    .text('Month');
}

/**
 * Load album sales data from a JSON URL.
 * @param url The URL to fetch the JSON data from
 */
export async function loadAlbumSalesData(url: string): Promise<AlbumSale[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to load album sales data');
  return response.json();
}