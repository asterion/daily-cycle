// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import {PERIODS, getDayPeriod} from './dayPeriod.js';

const UPDATE_INTERVAL_S = 60;

function formatHour(hour) {
    return `${String(hour).padStart(2, '0')}:00`;
}

export const DailyCycleIndicator = GObject.registerClass(
class DailyCycleIndicator extends PanelMenu.Button {
    _init(name) {
        super._init(0.0, name);

        this._periodNames = {
            'early-morning': _('Early morning'),
            'morning': _('Morning'),
            'noon': _('Noon'),
            'afternoon': _('Afternoon'),
            'night': _('Night'),
        };

        this._icon = new St.Icon({style_class: 'system-status-icon'});
        this.add_child(this._icon);

        // The menu is a legend: one row per period, with its icon, name and hours
        this._items = new Map();
        PERIODS.forEach((period, i) => {
            // The last period ends when the first one starts
            const endHour = PERIODS[(i + 1) % PERIODS.length].startHour;
            const item = new PopupMenu.PopupBaseMenuItem({reactive: false, can_focus: false});
            item.add_child(new St.Icon({icon_name: period.iconName, style_class: 'popup-menu-icon'}));
            item.add_child(new St.Label({
                text: this._periodNames[period.id],
                x_expand: true,
                y_align: Clutter.ActorAlign.CENTER,
            }));
            item.add_child(new St.Label({
                text: `${formatHour(period.startHour)} – ${formatHour(endHour)}`,
                style_class: 'daily-cycle-hours',
                y_align: Clutter.ActorAlign.CENTER,
            }));
            this.menu.addMenuItem(item);
            this._items.set(period.id, item);
        });

        this._update();
        this._timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, UPDATE_INTERVAL_S, () => {
            this._update();
            return GLib.SOURCE_CONTINUE;
        });
    }

    _update() {
        const current = getDayPeriod(GLib.DateTime.new_now_local().get_hour());
        this._icon.icon_name = current.iconName;
        // Read by screen readers, since the icon alone does not name the period
        this.accessible_name = this._periodNames[current.id];

        // Non-reactive rows are dimmed by the theme: the current one stands out
        // at full brightness, in bold and with a dot
        for (const [id, item] of this._items) {
            if (id === current.id) {
                item.remove_style_class_name('popup-inactive-menu-item');
                item.add_style_class_name('daily-cycle-current');
                item.setOrnament(PopupMenu.Ornament.DOT);
            } else {
                item.add_style_class_name('popup-inactive-menu-item');
                item.remove_style_class_name('daily-cycle-current');
                item.setOrnament(PopupMenu.Ornament.NO_DOT);
            }
        }
    }

    destroy() {
        GLib.Source.remove(this._timeoutId);
        this._timeoutId = 0;

        this._icon = null;
        this._items = null;
        this._periodNames = null;

        super.destroy();
    }
});
