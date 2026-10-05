// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

// Periods of the day, each starting at its hour and lasting until the next one starts
export const PERIODS = [
    {id: 'early-morning', startHour: 0, iconName: 'night-light-symbolic'},
    {id: 'morning', startHour: 6, iconName: 'daytime-sunrise-symbolic'},
    {id: 'noon', startHour: 12, iconName: 'weather-clear-symbolic'},
    {id: 'afternoon', startHour: 14, iconName: 'daytime-sunset-symbolic'},
    {id: 'night', startHour: 20, iconName: 'weather-clear-night-symbolic'},
];

/**
 * Period of the day for an hour.
 *
 * @param {number} hour - hour of the day, 0 to 23
 * @returns {{id: string, startHour: number, iconName: string}} the period
 */
export function getDayPeriod(hour) {
    return PERIODS.findLast(period => hour >= period.startHour);
}
