import { Controller, Get, Header } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { TollLog } from './logs/toll-log.model';

@Controller()
export class AppController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getInfo(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Toll Plaza API</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 560px; margin: 3rem auto; padding: 0 1rem; line-height: 1.5; }
    h1 { color: #0f766e; }
    a.button {
      display: inline-block; margin: 1rem 0; padding: 0.75rem 1.25rem;
      background: #0f766e; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;
    }
    code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; }
    .ok { color: #166534; font-weight: 600; }
    .note { color: #64748b; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Toll Plaza API</h1>
  <p class="ok">Backend is running — this is not an error.</p>
  <p>Use the <strong>dashboard</strong> for the full operator UI (table, search, forms):</p>
  <a class="button" href="http://localhost:4200">Open Dashboard → localhost:4200</a>
  <p class="note">Or a simple read-only table on this server:</p>
  <p><a href="/records">View toll records (HTML table)</a></p>
  <p><strong>For developers (raw JSON):</strong> <a href="/logs"><code>GET /logs</code></a></p>
</body>
</html>`;
  }

  @Get('records')
  @Header('Content-Type', 'text/html; charset=utf-8')
  viewRecords(): string {
    const logs = this.logsService.findAll();
    const rows = logs.map((log) => this.renderRow(log)).join('');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Toll Records</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    h1 { color: #0f766e; }
    table { border-collapse: collapse; width: 100%; max-width: 900px; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f8fafc; }
    a { color: #0f766e; }
    .ok { color: #166534; font-weight: 600; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <p class="ok">Toll records loaded successfully — this is live data, not an error.</p>
  <h1>Toll Records</h1>
  <p><a href="/">← API home</a> · <a href="http://localhost:4200">Open full dashboard</a></p>
  <table>
    <thead>
      <tr>
        <th>License Plate</th>
        <th>Vehicle Type</th>
        <th>Timestamp</th>
        <th>Toll Fee</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
  }

  private renderRow(log: TollLog): string {
    const fee = log.tollFee.toFixed(2);
    const official = log.isOfficial ? ' (Official)' : '';
    const time = new Date(log.timestamp).toLocaleString();
    return `<tr>
      <td>${this.escape(log.licensePlate)}</td>
      <td>${this.escape(log.vehicleType)}${official}</td>
      <td>${this.escape(time)}</td>
      <td>$${fee}</td>
      <td>${this.escape(log.status)}</td>
    </tr>`;
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
