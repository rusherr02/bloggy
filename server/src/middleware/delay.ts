import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to add random delays to responses for testing purposes
 * Simulates slow network/server conditions
 */
export function randomDelay(req: Request, res: Response, next: NextFunction) {
  // 10% chance of delay
  if (Math.random() < 0.1) {
    const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
    console.log(`[DELAY MIDDLEWARE] Adding ${delay}ms delay to ${req.method} ${req.path}`);
    setTimeout(next, delay);
  } else {
    next();
  }
}

/**
 * Endpoint to explicitly test delays
 * GET /api/delay/:ms - waits for specified milliseconds
 */
export function delayEndpoint(req: Request, res: Response) {
  const ms = parseInt(req.params.ms);

  if (isNaN(ms) || ms < 0 || ms > 10000) {
    return res.status(400).json({ error: 'Invalid delay value. Must be between 0 and 10000ms' });
  }

  console.log(`[DELAY ENDPOINT] Delaying response for ${ms}ms`);

  setTimeout(() => {
    res.json({
      delayed: ms,
      message: `Response delayed by ${ms}ms`,
      timestamp: new Date().toISOString()
    });
  }, ms);
}
